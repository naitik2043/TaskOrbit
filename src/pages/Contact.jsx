import { useState } from "react";
import { Button } from "../components/UIComponents.jsx";
import { useApp } from "../context/AppContext.jsx";
import { Send, Mail, MessageSquare, User } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const { showToast } = useApp();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      showToast("Please fill all fields", "error");
      return;
    }
    showToast("Message sent! We'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="w-full min-h-[calc(100vh-120px)] flex items-center justify-center px-4">
      <div className="w-full max-w-[650px] flex flex-col gap-12">
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            Contact Us 📬
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Have questions or feedback? We'd love to hear from you.
          </p>
        </div>

        <div
          className="
          w-full rounded-2xl p-8
          bg-white dark:bg-gray-900
          border border-gray-200 dark:border-gray-800
          shadow-sm hover:shadow-md transition
        "
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              icon={<User size={16} />}
              label="Name"
              value={form.name}
              onChange={(val) => setForm({ ...form, name: val })}
              placeholder="Your name"
            />

            <InputField
              icon={<Mail size={16} />}
              label="Email"
              value={form.email}
              onChange={(val) => setForm({ ...form, email: val })}
              placeholder="you@example.com"
            />

            <TextAreaField
              icon={<MessageSquare size={16} />}
              label="Message"
              value={form.message}
              onChange={(val) => setForm({ ...form, message: val })}
              placeholder="Your message..."
            />

            <Button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 text-base"
            >
              <Send size={16} /> Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

function InputField({ label, icon, value, onChange, placeholder }) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
        {label}
      </label>

      <div className="relative mt-2">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </span>

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="
            w-full pl-10 pr-4 py-3 rounded-xl text-sm
            bg-white dark:bg-gray-900
            border border-gray-200 dark:border-gray-700
            text-gray-900 dark:text-white
            placeholder:text-gray-400
            focus:outline-none focus:ring-2 focus:ring-indigo-500
            transition
          "
        />
      </div>
    </div>
  );
}

function TextAreaField({ label, icon, value, onChange, placeholder }) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
        {label}
      </label>

      <div className="relative mt-2">
        <span className="absolute left-3 top-3 text-gray-400">{icon}</span>

        <textarea
          rows={5}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="
            w-full pl-10 pr-4 py-3 rounded-xl text-sm resize-none
            bg-white dark:bg-gray-900
            border border-gray-200 dark:border-gray-700
            text-gray-900 dark:text-white
            placeholder:text-gray-400
            focus:outline-none focus:ring-2 focus:ring-indigo-500
            transition
          "
        />
      </div>
    </div>
  );
}
