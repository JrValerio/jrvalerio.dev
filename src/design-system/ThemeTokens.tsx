import { tokensStylesheet } from "./tokens";

/** Emits the design-token custom properties once per page. */
export default function ThemeTokens() {
  return <style data-jv-tokens dangerouslySetInnerHTML={{ __html: tokensStylesheet() }} />;
}
