<script lang="ts">
let status = $state("");
let errorMessage = $state("");

async function handleSubmit(e: SubmitEvent) {
	e.preventDefault();
	status = "loading";
	errorMessage = "";

	const form = e.target as HTMLFormElement;
	const formData = new FormData(form);
	const payload = Object.fromEntries(formData.entries());

	try {
		const response = await fetch("/api/contact", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload),
		});
		const result = await response.json();
		if (response.ok && result.success) {
			status = "submitted";
			form.reset();
			setTimeout(() => (status = ""), 5000);
		} else {
			errorMessage = result.error || "";
			status = "error";
		}
	} catch (err) {
		status = "error";
	}
}
</script>

<div class="space-y-6 md:space-y-8">
  <!-- Form Header -->
  <div>
    <h3
      class="text-lg md:text-xl font-black uppercase tracking-tighter mb-2 text-[hsl(var(--foreground))]"
    >
      Send a Message
    </h3>
    <p class="text-sm text-[hsl(var(--muted-foreground))]">
      Fill out the form below and I'll get back to you within 24 hours.
    </p>
  </div>

  <form onsubmit={handleSubmit} class="space-y-6">
    <div class="grid gap-6 sm:grid-cols-2">
      <div class="space-y-2">
        <label
          for="name"
          class="block text-xs font-bold uppercase tracking-wider text-[hsl(var(--foreground))]"
        >
          Full Name <span class="text-[hsl(var(--destructive))]">*</span>
        </label>
        <input
          id="name"
          name="name"
          required
          placeholder="John Doe"
          autocomplete="name"
          class="flex h-12 w-full border-2 border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-3 text-sm font-medium placeholder:text-[hsl(var(--muted-foreground))]/60 placeholder:font-normal focus-visible:outline-none focus-visible:border-[hsl(var(--primary))] focus-visible:ring-3 focus-visible:ring-[hsl(var(--primary))]/20 transition-all hover:border-[hsl(var(--border))]/60 user-invalid:border-red-500/60 user-invalid:ring-3 user-invalid:ring-red-500/10"
        />
      </div>
      <div class="space-y-2">
        <label
          for="email"
          class="block text-xs font-bold uppercase tracking-wider text-[hsl(var(--foreground))]"
        >
          Email Address <span class="text-[hsl(var(--destructive))]">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="john@example.com"
          autocomplete="email"
          class="flex h-12 w-full border-2 border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-3 text-sm font-medium placeholder:text-[hsl(var(--muted-foreground))]/60 placeholder:font-normal focus-visible:outline-none focus-visible:border-[hsl(var(--primary))] focus-visible:ring-3 focus-visible:ring-[hsl(var(--primary))]/20 transition-all hover:border-[hsl(var(--border))]/60 user-invalid:border-red-500/60 user-invalid:ring-3 user-invalid:ring-red-500/10"
        />
      </div>
    </div>

    <div class="space-y-2">
      <label
        for="subject"
        class="block text-xs font-bold uppercase tracking-wider text-[hsl(var(--foreground))]"
      >
        Subject <span class="text-[hsl(var(--muted-foreground))]/60"
          >(Optional)</span
        >
      </label>
      <input
        id="subject"
        name="subject"
        placeholder="Brief description of your project"
        class="flex h-12 w-full border-2 border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-3 text-sm font-medium placeholder:text-[hsl(var(--muted-foreground))]/60 placeholder:font-normal focus-visible:outline-none focus-visible:border-[hsl(var(--primary))] focus-visible:ring-3 focus-visible:ring-[hsl(var(--primary))]/20 transition-all hover:border-[hsl(var(--border))]/60"
      />
    </div>

    <!-- Honeypot: hidden from humans, bots fill it and get silently dropped -->
    <div class="hidden" aria-hidden="true">
      <label for="company">Company</label>
      <input id="company" name="company" type="text" tabindex="-1" autocomplete="off" />
    </div>

    <div class="space-y-2">
      <label
        for="message"
        class="block text-xs font-bold uppercase tracking-wider text-[hsl(var(--foreground))]"
      >
        Message <span class="text-[hsl(var(--destructive))]">*</span>
      </label>
      <textarea
        id="message"
        name="message"
        required
        placeholder="Tell me about your project, timeline, and what you're looking to build..."
        rows="6"
        class="flex w-full border-2 border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-3 text-sm font-medium placeholder:text-[hsl(var(--muted-foreground))]/60 placeholder:font-normal focus-visible:outline-none focus-visible:border-[hsl(var(--primary))] focus-visible:ring-3 focus-visible:ring-[hsl(var(--primary))]/20 resize-none transition-all hover:border-[hsl(var(--border))]/60 user-invalid:border-red-500/60 user-invalid:ring-3 user-invalid:ring-red-500/10"
      ></textarea>
      <div class="text-xs text-[hsl(var(--muted-foreground))] font-mono">
        Minimum 20 characters
      </div>
    </div>

    <div class="flex flex-col sm:flex-row gap-4 pt-2">
      <button
        type="submit"
        disabled={status === "loading"}
        class="flex-1 inline-flex items-center justify-center gap-3 whitespace-nowrap text-sm font-bold uppercase tracking-widest h-14 bg-[hsl(var(--foreground))] text-[hsl(var(--background))] border-2 border-[hsl(var(--foreground))] hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))] hover:border-[hsl(var(--primary))] transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] hover:-translate-y-1"
      >
        {#if status === "loading"}
          <svg
            class="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Sending...
        {:else}
          <span>Send Message</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            ><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg
          >
        {/if}
      </button>
    </div>

    {#if status === "submitted"}
      <div
        class="p-5 bg-[hsl(var(--primary))]/10 border-2 border-[hsl(var(--primary))]/30 flex items-start gap-4 animate-fade-in"
        role="alert"
      >
        <div
          class="w-10 h-10 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] flex items-center justify-center shrink-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
            ><polyline points="20 6 9 17 4 12"></polyline></svg
          >
        </div>
        <div>
          <div
            class="text-sm font-bold uppercase tracking-wider text-[hsl(var(--foreground))] mb-1"
          >
            Message Sent!
          </div>
          <div class="text-sm text-[hsl(var(--muted-foreground))]">
            Thanks for reaching out. I'll get back to you within 24 hours.
          </div>
        </div>
      </div>
    {:else if status === "error"}
      <div
        class="p-5 bg-red-500/10 border-2 border-red-500/30 flex items-start gap-4 animate-fade-in"
        role="alert"
      >
        <div
          class="w-10 h-10 bg-red-500 text-white flex items-center justify-center shrink-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            ><circle cx="12" cy="12" r="10"></circle><line
              x1="12"
              y1="8"
              x2="12"
              y2="12"
            ></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg
          >
        </div>
        <div>
          <div
            class="text-sm font-bold uppercase tracking-wider text-[hsl(var(--foreground))] mb-1"
          >
            Sending Failed
          </div>
          <div class="text-sm text-[hsl(var(--muted-foreground))]">
            {errorMessage ||
              "There was an error sending your message. Please try again or email me directly."}
          </div>
        </div>
      </div>
    {/if}
  </form>
</div>

<style>
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in {
    animation: fade-in 0.3s ease-out;
  }
</style>
