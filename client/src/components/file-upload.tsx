import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { FilePlus2, Calendar1 } from "lucide-react";
import { Input } from "./ui/input";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { Label } from "./ui/label";
import { SearchUser } from "./search-user";

export const FileUpload = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-primary text-primary-foreground p-2 rounded-full shadow-md hover:bg-primary/90 transition-colors w-18 h-18">
          <FilePlus2 className="w-22 h-22" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload File</DialogTitle>
          <DialogDescription>
            Upload a file to your vault. Supported formats: .txt, .md, .pdf,
            .docx, .xlsx, .csv, .zip, .rar, .tar, .gz, .7z, .jpg, .jpeg, .png,
            .gif.
          </DialogDescription>
        </DialogHeader>

        <Input id="picture" type="file" />
        <Popover>
          <PopoverTrigger>
            <Button className="w-full bg-background text-foreground" variant="outline">
              <Calendar1 className="h-4 w-4 opacity-50" />
              <span className="ml-2">Select Expiring Time</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              className="bg-background text-foreground"
              mode="single"
              disabled={(date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Label htmlFor="download-limit">
          Download Limit
        </Label>
        <Input
          id="download-limit"
          type="number"
          placeholder="Download Limit"
        />

        <Label htmlFor="general-access">
          Give Access To
        </Label>
        <SearchUser />

        <Button className="mt-4" type="submit">
          Upload
        </Button>
      </DialogContent>
    </Dialog>
  );
};
