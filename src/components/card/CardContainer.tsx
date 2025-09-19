"use client";

import { UserDataContext } from "@/context/context";
import React, { useContext } from "react";
import Card from "./Card";
import { useRouter } from "next/navigation";

export interface CardDataTypes {
  _id: string;
  name: string;
  title: string;
  location: string;
  phone: number;
  email: string;
  urls: string[];
}

interface CardContainerProps {
  success: boolean;
  data: CardDataTypes[];
}

const CardContainer = ({
  cardsData,
}: // handleDelete,
// handleEdit,
{
  cardsData: CardContainerProps;
  // handleEdit: (id: string) => void;
  // handleDelete: (id: string) => void;
}) => {
  const { query } = useContext(UserDataContext);
  const router = useRouter();
  const cardEditHandler = async (id: string) => {
    // console.log("Edit card with id:", id);

    // await fetch(`/api/server/${id}`, {
    //   method: "PUT",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(updatedFields),
    // });
    // router.refresh();

    router.push(`/editcontact/${id}`);
  };

  const cardDeletHandler = async (id: string) => {
    console.log("Delete card with id:", id);
    await fetch(`/api/server/${id}`, { method: "DELETE" });
    router.refresh();
  };

  const filteredCards = cardsData?.data?.filter(
    (card) =>
      card.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()) ||
      card.email.toLocaleLowerCase().includes(query.toLocaleLowerCase()) ||
      card.location.toLocaleLowerCase().includes(query.toLocaleLowerCase()) ||
      card.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
  );

  console.log(query, filteredCards);

  return (
    <div className="px-4 grid grid-cols-1 sm:grid-cols-2  gap-6 ">
      {filteredCards?.map((cardData) => (
        <Card
          key={cardData._id}
          cardData={cardData}
          handleEdit={() => cardEditHandler(cardData._id)}
          handleDelete={() => cardDeletHandler(cardData._id)}
        />
      ))}
    </div>
  );
};

export default CardContainer;
