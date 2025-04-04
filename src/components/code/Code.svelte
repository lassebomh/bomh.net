<script lang="ts" module>
  const _js = () => import("@codemirror/lang-javascript").then(({ javascript }) => javascript);

  const languages = {
    svelte: () => import("@replit/codemirror-lang-svelte").then(({ svelte }) => svelte),
    xml: () => import("@codemirror/lang-xml").then(({ xml }) => xml),
    json: () => import("@codemirror/lang-json").then(({ json }) => json),
    html: () => import("@codemirror/lang-html").then(({ html }) => html),
    js: () => _js().then((js) => () => js()),
    jsx: () => _js().then((js) => () => js({ jsx: true })),
    ts: () => _js().then((js) => () => js({ typescript: true })),
    tsx: () => _js().then((js) => () => js({ typescript: true, jsx: true })),
  } as const;

  type Language = keyof typeof languages;
  type LanguageSupportParams<T extends Language> = Parameters<Awaited<ReturnType<(typeof languages)[T]>>>[0];
  type LanguageOptions<T extends Language> =
    LanguageSupportParams<T> extends [] ? {} : NonNullable<LanguageSupportParams<T>>;
</script>

<!-- svelte-ignore state_referenced_locally -->
<script lang="ts" generics="T extends Language">
  import { EditorView, basicSetup } from "codemirror";
  import { EditorState, type Extension, StateEffect } from "@codemirror/state";
  import type { SvelteHTMLElements } from "svelte/elements";
  import { vsCodeDark } from "./vscode-dark-theme";
  import { vsCodeLight } from "./vscode-light-theme";
  import { onMount } from "svelte";
  import type { LanguageSupport } from "@codemirror/language";
  import { gutter } from "@codemirror/view";

  type Props = {
    value: string;
    lang: T | "plaintext";

    readonly?: boolean;
    wrap?: boolean | "anywhere";
    lineNumbers?: boolean;

    options?: LanguageOptions<T>;
  } & Omit<SvelteHTMLElements["div"], "class">;

  let {
    value = $bindable(),
    lang,
    options,
    lineNumbers = true,
    readonly = false,
    wrap = false,
    ...rest
  }: Props = $props();

  let languageSupport = $state<LanguageSupport>();

  const extensions = $derived.by(() => {
    const array = new Array<Extension>([
      vsCodeDark,
      basicSetup,
      EditorState.readOnly.of(readonly),

      EditorView.updateListener.of((viewUpdate) => {
        if (!viewUpdate.docChanged) return;
        const newValue = viewUpdate.state.doc.toString();
        if (value === newValue) return;
        value = newValue;
      }),
    ]);

    if (languageSupport !== undefined) array.push(languageSupport);
    if (wrap) array.push(EditorView.lineWrapping);

    if (lineNumbers) array.push(gutter({}));

    return array;
  });

  $effect.pre(() => {
    if (lang === "plaintext") return;

    (async (lang, options) => {
      const langSupport = await languages[lang]();
      languageSupport = langSupport(options);
    })(lang, options);
  });

  let view = $state<EditorView>();

  $effect.pre(() => {
    view?.dispatch({
      effects: StateEffect.reconfigure.of(extensions),
    });
  });

  $effect.pre(() => {
    if (view !== undefined && value !== view.state.doc.toString()) {
      view.dispatch({
        changes: {
          from: 0,
          to: view.state.doc.length,
          insert: value,
        },
      });
    }
  });

  let node: HTMLDivElement | undefined;

  onMount(() => {
    const cls = class extends (EditorView as any) {
      get dom() {
        return node;
      }
      set dom(_) {}
    } as any as typeof EditorView;

    view = new cls({
      doc: value,
      extensions,
    });

    return () => {
      view!.destroy();
    };
  });
</script>

<div data-readonly={readonly} data-break-anywhere={wrap === "anywhere"} bind:this={node} {...rest}></div>

<style>
  :global(.cm-editor) {
    &[data-readonly="true"] .cm-cursor {
      display: none !important;
    }
  }
</style>
