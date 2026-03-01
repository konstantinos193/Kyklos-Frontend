"use client";

import * as Sentry from "@sentry/nextjs";
import { Button } from "@/components/ui/button";

function TestComponent() {
  const handleTestButtonClick = () => {
    // Create a transaction/span to measure performance
    Sentry.startSpan(
      {
        op: "ui.click",
        name: "Test Button Click",
      },
      (span) => {
        const value = "some config";
        const metric = "some metric";

        // Metrics can be added to the span
        span.setAttribute("config", value);
        span.setAttribute("metric", metric);

        console.log("Test button clicked with Sentry span");
      },
    );
  };

  const triggerError = () => {
    try {
      // This will cause an error
      const undefinedFunction = (window as any).myUndefinedFunction;
      undefinedFunction();
    } catch (error) {
      // Capture the exception in Sentry
      Sentry.captureException(error);
      console.error("Test error captured:", error);
    }
  };

  const triggerUnhandledError = () => {
    // This will trigger an unhandled error
    (window as any).myUndefinedFunction();
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Sentry Testing Page</h1>
      
      <div className="space-y-4">
        <div className="p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Span Testing</h2>
          <p className="text-gray-600 mb-4">
            Click this button to test Sentry span instrumentation
          </p>
          <Button onClick={handleTestButtonClick}>
            Test Sentry Span
          </Button>
        </div>

        <div className="p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Exception Testing</h2>
          <p className="text-gray-600 mb-4">
            Click this button to trigger and capture an exception
          </p>
          <Button onClick={triggerError} variant="outline">
            Trigger Handled Error
          </Button>
        </div>

        <div className="p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Unhandled Error Testing</h2>
          <p className="text-gray-600 mb-4">
            Click this button to trigger an unhandled error (will be caught by global error handler)
          </p>
          <Button onClick={triggerUnhandledError} variant="destructive">
            Trigger Unhandled Error
          </Button>
        </div>
      </div>

      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Testing Instructions</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>Open your Sentry dashboard</li>
          <li>Click the buttons above to generate test events</li>
          <li>Check your Sentry issues and performance tabs for the captured data</li>
          <li>Verify that spans, exceptions, and logs are appearing correctly</li>
        </ol>
      </div>
    </div>
  );
}

export default function SentryExamplePage() {
  return <TestComponent />;
}
