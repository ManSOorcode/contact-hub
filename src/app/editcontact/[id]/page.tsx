// app/editContact/[id]/page.tsx

import ContactForm from "@/components/form/ContactForm";

export default async function EditContactPage({
  params,
}: {
  params: { id: string };
}) {
  const res = await fetch(`http://localhost:3000/api/server/${params.id}`, {
    cache: "no-store", // ensure fresh data
  });

  if (!res.ok) {
    return <div>Failed to load contact</div>;
  }

  const contact = await res.json();

  console.log(params.id, contact);

  return <ContactForm initialData={contact.data} contactId={params.id} />;
}
