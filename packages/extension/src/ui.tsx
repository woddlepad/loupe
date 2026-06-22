import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, X } from "lucide-react";
import { cn } from "./lib/cn.js";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "xs" | "sm" | "icon";
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, style, variant = "secondary", size = "sm", ...props },
  ref,
) {
  const sizeStyle: React.CSSProperties =
    size === "xs"
      ? { height: 28, minHeight: 28, maxHeight: 28, paddingTop: 0, paddingBottom: 0, lineHeight: 1 }
      : size === "sm"
        ? { height: 36, minHeight: 36, maxHeight: 36, paddingTop: 0, paddingBottom: 0, lineHeight: 1 }
        : { height: 32, minHeight: 32, maxHeight: 32, padding: 0, lineHeight: 1 };

  return (
    <button
      ref={ref}
      style={{ ...sizeStyle, ...style }}
      className={cn(
        "box-border inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-lg text-[12px] font-medium outline-none appearance-none",
        "transition-all duration-150 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 disabled:active:scale-100",
        "focus-visible:ring-1 focus-visible:ring-loupe-accent/70",
        variant === "primary" && "bg-loupe-fg text-loupe-bg shadow-sm shadow-black/20 hover:bg-white",
        variant === "secondary" &&
          "border border-loupe-line bg-loupe-bg/70 text-loupe-muted hover:border-loupe-line-strong hover:text-loupe-fg",
        variant === "ghost" && "text-loupe-muted hover:bg-white/5 hover:text-loupe-fg",
        variant === "danger" &&
          "border border-loupe-line bg-loupe-bg/70 text-loupe-muted hover:border-white/35 hover:text-loupe-fg",
        size === "xs" && "h-7 px-2.5",
        size === "sm" && "h-9 px-3",
        size === "icon" && "h-8 w-8 p-0",
        className,
      )}
      {...props}
    />
  );
});

export function Badge({
  className,
  tone = "muted",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { tone?: "muted" | "open" | "resolved" }) {
  return (
    <span
      className={cn(
        "inline-flex h-5 items-center gap-1 rounded-md border px-1.5 text-[10.5px] leading-none",
        tone === "muted" && "border-loupe-line bg-loupe-bg/70 text-loupe-faint",
        tone === "open" && "border-loupe-accent/25 bg-loupe-accent/10 text-loupe-muted",
        tone === "resolved" && "border-white/20 bg-white/10 text-loupe-muted",
        className,
      )}
      {...props}
    />
  );
}

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...props }, ref) {
    return (
      <input
        ref={ref}
        className={cn(
          "h-9 w-full rounded-lg border border-loupe-line bg-loupe-bg/80 px-2.5 text-[12px] text-loupe-fg outline-none",
          "transition-colors placeholder:text-loupe-faint focus:border-loupe-accent/60",
          className,
        )}
        {...props}
      />
    );
  },
);

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  function Textarea({ className, ...props }, ref) {
    return (
      <textarea
        ref={ref}
        className={cn(
          "min-h-16 w-full resize-y rounded-lg border border-loupe-line bg-loupe-bg/80 px-2.5 py-2 text-[12px] text-loupe-fg outline-none",
          "transition-colors placeholder:text-loupe-faint focus:border-loupe-accent/60",
          className,
        )}
        {...props}
      />
    );
  },
);

export const Select = SelectPrimitive.Root;

export const SelectGroup = SelectPrimitive.Group;

export const SelectValue = SelectPrimitive.Value;

export const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(function SelectTrigger({ className, children, ...props }, ref) {
  return (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex h-9 min-w-0 items-center justify-between gap-2 rounded-lg border border-loupe-line bg-loupe-bg/80 px-2.5 text-[12px] text-loupe-muted outline-none",
        "transition-all duration-150 active:scale-[0.99] hover:border-loupe-line-strong hover:text-loupe-fg focus:border-loupe-accent/60 disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="h-3.5 w-3.5 opacity-70" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
});

export const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(function SelectContent({ className, children, position = "popper", ...props }, ref) {
  return (
    <SelectPrimitive.Content
      ref={ref}
      position={position}
      className={cn(
        "z-[2147483647] max-h-64 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-lg border border-loupe-line bg-loupe-panel text-loupe-fg shadow-xl shadow-black/40",
        "data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1",
        className,
      )}
      {...props}
    >
      <SelectPrimitive.Viewport className="p-1">{children}</SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  );
});

export const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(function SelectItem({ className, children, ...props }, ref) {
  return (
    <SelectPrimitive.Item
      ref={ref}
      className={cn(
        "relative flex h-8 cursor-pointer select-none items-center rounded-lg px-2 pl-7 text-[12px] text-loupe-muted outline-none",
        "data-[highlighted]:bg-loupe-elev data-[highlighted]:text-loupe-fg data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check className="h-3.5 w-3.5" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
});

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

export function DialogContent({
  className,
  children,
  showClose = true,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & { showClose?: boolean }) {
  return (
    <>
      <DialogPrimitive.Overlay className="fixed inset-0 z-[2147483647] bg-black/65 data-[state=open]:animate-in data-[state=closed]:animate-out" />
      <DialogPrimitive.Content
        className={cn(
          "fixed left-1/2 top-1/2 z-[2147483647] grid w-[min(92vw,560px)] max-h-[86vh] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-loupe-line bg-loupe-panel text-loupe-fg shadow-2xl shadow-black/50 outline-none",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
          className,
        )}
        {...props}
      >
        {children}
        {showClose ? (
          <DialogPrimitive.Close className="absolute right-3 top-3 rounded-lg p-1.5 text-loupe-muted transition-colors hover:bg-white/5 hover:text-loupe-fg focus:outline-none focus:ring-1 focus:ring-loupe-accent/70">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        ) : null}
      </DialogPrimitive.Content>
    </>
  );
}

export function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-1.5 px-5 pt-5", className)} {...props} />;
}

export function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center justify-end gap-2 border-t border-loupe-line px-5 py-3", className)} {...props} />;
}

export const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(function DialogTitle({ className, ...props }, ref) {
  return <DialogPrimitive.Title ref={ref} className={cn("text-[15px] font-semibold leading-none", className)} {...props} />;
});

export const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(function DialogDescription({ className, ...props }, ref) {
  return <DialogPrimitive.Description ref={ref} className={cn("text-[12px] text-loupe-muted", className)} {...props} />;
});
