// SPDX-License-Identifier: AGPL-3.0-only
// See the LICENSE file for details.

import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { TPqlDialect, TWorkItemQueryFields } from "@plane/types";
import { WorkItemQueryHelp } from "./query-help";

vi.mock("@plane/i18n", () => ({
  useTranslation: () => ({
    t: (key: string, params?: Record<string, string>) => (params ? `${key}:${Object.values(params).join(",")}` : key),
  }),
}));

const fields: TWorkItemQueryFields = {
  fields: [
    {
      name: "target_date",
      type: "date",
      lookups: ["exact", "lt"],
      operators: ["=", "<"],
      choices: null,
      aliases: ["due_date"],
      plane_aliases: ["dueDate", "targetDate"],
      people: false,
    },
  ],
  unsupported: {},
  functions: [
    { name: "openStates", kind: "list", arguments: 0 },
    { name: "today", kind: "value", arguments: 0 },
  ],
  custom_property_syntax: 'cf["<property id or name>"]',
};

const renderHelp = (dialect: TPqlDialect, memberDialect: TPqlDialect | null = null) => {
  const onDialectChange = vi.fn();
  render(
    <WorkItemQueryHelp
      fields={fields}
      dialect={dialect}
      workspaceDialect="jql"
      memberDialect={memberDialect}
      onDialectChange={onDialectChange}
      onClose={() => {}}
    />
  );
  return { onDialectChange };
};

describe("WorkItemQueryHelp", () => {
  it("lists JQL names and no list functions in the jql dialect", () => {
    renderHelp("jql");
    expect(screen.getByText("due_date")).toBeTruthy();
    expect(screen.queryByText("dueDate")).toBeNull();
    expect(screen.getByText("today()")).toBeTruthy();
    expect(screen.queryByText("openStates()")).toBeNull();
    expect(screen.getByText(/state_group in \(unstarted, started\)/)).toBeTruthy();
  });

  it("lists Plane names, list functions and Plane examples in the plane dialect", () => {
    renderHelp("plane");
    expect(screen.getByText("dueDate")).toBeTruthy();
    expect(screen.queryByText("due_date")).toBeNull();
    expect(screen.getByText("openStates()")).toBeTruthy();
    expect(screen.getByText(/stateGroup in activeStates\(\)/)).toBeTruthy();
  });

  it("sets the member's own dialect, or clears it to follow the workspace", () => {
    const { onDialectChange } = renderHelp("jql");
    const select = screen.getByRole("combobox", { name: "work_item_query.dialect" });
    expect(screen.getByRole("option", { name: "work_item_query.dialect_default:JQL" })).toBeTruthy();

    fireEvent.change(select, { target: { value: "plane" } });
    expect(onDialectChange).toHaveBeenLastCalledWith("plane");

    fireEvent.change(select, { target: { value: "" } });
    expect(onDialectChange).toHaveBeenLastCalledWith(null);
  });

  it("shows the member's own choice as selected", () => {
    renderHelp("plane", "plane");
    expect(screen.getByRole<HTMLSelectElement>("combobox", { name: "work_item_query.dialect" }).value).toBe("plane");
  });
});
