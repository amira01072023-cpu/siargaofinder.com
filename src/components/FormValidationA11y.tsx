"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

type FormField = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

const FIELD_SELECTOR = "input:not([type='hidden']), select, textarea";

function isFormField(target: EventTarget | null): target is FormField {
  return (
    target instanceof HTMLInputElement ||
    target instanceof HTMLSelectElement ||
    target instanceof HTMLTextAreaElement
  );
}

function getFieldName(field: FormField) {
  const label = field.labels?.[0]?.textContent?.replace(/\s+/g, " ").trim();
  return label || field.getAttribute("aria-label") || field.name || "This field";
}

export default function FormValidationA11y() {
  const pathname = usePathname();
  const announcerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const flagged = new WeakSet<FormField>();
    let announceTimer: number | undefined;

    const linkErrorDescription = (field: FormField, invalid: boolean) => {
      const errorId = field.dataset.error;
      if (!errorId) return;

      const descriptionIds = (field.getAttribute("aria-describedby") || "")
        .split(/\s+/)
        .filter((id) => id && id !== errorId);

      if (invalid) descriptionIds.push(errorId);

      if (descriptionIds.length > 0) {
        field.setAttribute("aria-describedby", descriptionIds.join(" "));
      } else {
        field.removeAttribute("aria-describedby");
      }
    };

    const syncField = (field: FormField, forceInvalid = false) => {
      const invalid = forceInvalid || field.matches(":user-invalid");

      if (invalid) {
        field.setAttribute("aria-invalid", "true");
        linkErrorDescription(field, true);
        flagged.add(field);
      } else if (flagged.has(field) || field.getAttribute("aria-invalid") !== "true") {
        field.setAttribute("aria-invalid", "false");
        linkErrorDescription(field, false);
        flagged.delete(field);
      }

      return invalid;
    };

    const announceFieldError = (field: FormField) => {
      const announcer = announcerRef.current;
      if (!announcer) return;

      window.clearTimeout(announceTimer);
      announcer.textContent = "";
      announceTimer = window.setTimeout(() => {
        const linkedError = field.dataset.error
          ? document.getElementById(field.dataset.error)?.textContent?.replace(/\s+/g, " ").trim()
          : "";
        const message = linkedError || field.validationMessage;
        if (message) announcer.textContent = `${getFieldName(field)}: ${message}`;
      }, 350);
    };

    const initializeFields = (root: ParentNode = document) => {
      root.querySelectorAll<FormField>(FIELD_SELECTOR).forEach((field) => syncField(field));
    };

    const handleBlur = (event: FocusEvent) => {
      if (!isFormField(event.target)) return;
      if (syncField(event.target)) announceFieldError(event.target);
    };

    const handleInput = (event: Event) => {
      if (!isFormField(event.target)) return;
      syncField(event.target);
    };

    const handleChange = (event: Event) => {
      if (!isFormField(event.target)) return;
      if (syncField(event.target)) announceFieldError(event.target);
    };

    const handleInvalid = (event: Event) => {
      if (!isFormField(event.target)) return;
      syncField(event.target, true);
    };

    const handleReset = (event: Event) => {
      if (!(event.target instanceof HTMLFormElement)) return;
      window.setTimeout(() => initializeFields(event.target as HTMLFormElement));
    };

    initializeFields();
    document.addEventListener("blur", handleBlur, true);
    document.addEventListener("input", handleInput);
    document.addEventListener("change", handleChange);
    document.addEventListener("invalid", handleInvalid, true);
    document.addEventListener("reset", handleReset, true);

    return () => {
      window.clearTimeout(announceTimer);
      document.removeEventListener("blur", handleBlur, true);
      document.removeEventListener("input", handleInput);
      document.removeEventListener("change", handleChange);
      document.removeEventListener("invalid", handleInvalid, true);
      document.removeEventListener("reset", handleReset, true);
    };
  }, [pathname]);

  return <div ref={announcerRef} className="visually-hidden" aria-live="polite" aria-atomic="true" />;
}
