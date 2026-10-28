/**
 * SPDX-License-Identifier: AGPL-3.0-only
 * See the LICENSE file for details.
 */

import { Editor } from "@tiptap/core";
import { describe, expect, it } from "vitest";

import { CustomMentionExtensionConfig } from "@/extensions/mentions/extension-config";
import { CustomStarterKitExtension } from "@/extensions/starter-kit";

describe("mention backspace", () => {
  it("turns a mention back into the trigger character", () => {
    const editor = new Editor({
      element: document.createElement("div"),
      extensions: [CustomStarterKitExtension({ enableHistory: false }), CustomMentionExtensionConfig],
      content:
        '<p>Hi <mention-component id="m1" entity_identifier="u1" entity_name="user_mention"></mention-component></p>',
    });
    editor.commands.focus("end");

    editor.commands.keyboardShortcut("Backspace");

    expect(editor.getText()).toBe("Hi @");
    editor.destroy();
  });
});
