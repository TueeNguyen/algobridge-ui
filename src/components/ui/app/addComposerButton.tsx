"use client";
import { Button } from "../button";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import LinkOrIdForm from "./linkOrIdForm";

export const AddComposerButton = () => {
  	const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button variant="default" className="m-2 border rounded-3xl bg-green-500 hover:bg-green-500 hover:opacity-70 dark:bg-green-800 dark:hover:bg-green-700" onClick={() => setOpen(true)}>
        <IconPlus /> Add
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a Composer symphony</DialogTitle>
          <LinkOrIdForm setDialogOpen={setOpen} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
