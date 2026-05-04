import { Terminal } from "@/components/ui/terminal";

/**
 * Loading – wrapper around the Wave component from UI.
 * Use <Loading /> wherever a loading indicator is required.
 */
export const Loading = () => {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-8">
      <Terminal className="h-24 w-42" />
    </div>
  );
};

export default Loading;
