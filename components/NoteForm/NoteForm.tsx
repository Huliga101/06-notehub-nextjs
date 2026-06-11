"use client";

import { FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
import type { NoteTag } from "@/types/note";
import css from "./NoteForm.module.css";

type NoteFormProps = {
  onClose: () => void;
};

const tags: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function NoteForm({ onClose }: NoteFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState<NoteTag>("Todo");

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onClose();
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    createMutation.mutate({
      title,
      content,
      tag,
    });
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <h2 className={css.title}>Create note</h2>

      <label className={css.label}>
        Title
        <input
          className={css.input}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
          minLength={3}
          maxLength={50}
        />
      </label>

      <label className={css.label}>
        Content
        <textarea
          className={css.textarea}
          value={content}
          onChange={(event) => setContent(event.target.value)}
          required
          minLength={3}
          maxLength={500}
        />
      </label>

      <label className={css.label}>
        Tag
        <select
          className={css.input}
          value={tag}
          onChange={(event) => setTag(event.target.value as NoteTag)}
        >
          {tags.map((tagName) => (
            <option key={tagName} value={tagName}>
              {tagName}
            </option>
          ))}
        </select>
      </label>

      <div className={css.actions}>
        <button type="button" onClick={onClose}>
          Cancel
        </button>

        <button type="submit" disabled={createMutation.isPending}>
          {createMutation.isPending ? "Creating..." : "Create"}
        </button>
      </div>
    </form>
  );
}