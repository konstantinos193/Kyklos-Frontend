"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MailIcon, CheckIcon } from "@/components/icons";

export function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubscribed(true);
    setIsLoading(false);
    setEmail("");
    
    // Reset success state after 3 seconds
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  if (isSubscribed) {
    return (
      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-center">
        <CheckIcon className="w-8 h-8 text-green-400 mx-auto mb-2" />
        <p className="text-green-400 text-sm font-medium">
          Ευχαριστούμε! Έχετε εγγραφεί στο newsletter μας.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-6 text-[#E7B109]">Newsletter</h3>
      <p className="text-gray-300 text-sm mb-4">
        Εγγραφείτε για να λαμβάνετε τα τελευταία νέα και ανακοινώσεις.
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="email"
            placeholder="Διεύθυνση email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10 bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-[#3BA99C] focus:ring-[#3BA99C]"
            required
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading || !email}
          className="w-full bg-[#3BA99C] hover:bg-[#2d7a6f] text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Εγγραφή..." : "Εγγραφή"}
        </Button>
      </form>
    </div>
  );
}
