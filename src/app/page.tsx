import CardContainer from "@/components/card/CardContainer";

export default async function Home() {
  const res = await fetch("http://localhost:3000/api/server", {
    next: { tags: ["changes"] },
  });

  const cardsData = await res.json();

  console.log(cardsData);
  return (
    <CardContainer
      cardsData={cardsData}
      // handleDelete={cardDeletHandler}
      // handleEdit={cardEditHandler}
    />
  );
}
