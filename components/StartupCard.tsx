import { formatDate } from "@/utils/helper";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Auther {
  name?: string;
  _id: string;
}
interface StartupTypeCard {
  views: number;
  createdAt: string;
  author: Auther;
  imageUrl?: string;
  title: string;
  category: string;
  _id: string;
  description: string;
}

const StartupCard = ({ post }: { post: StartupTypeCard }) => {
  const {
    views,
    createdAt,
    author: { _id: authorId, name },
    title,
    category,
    _id,
    imageUrl,
    description,
  } = post;

  return (
    <li className="startup-card group">
      <div className="flex-between">
        <p className="startup_card_date">{formatDate(createdAt)}</p>
        <div className="flex gap-1.5">
          <span>Icon</span>
          <span>{views}</span>
        </div>
      </div>
      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${authorId}`}>
            <p className="text-16-medium line-clamp-1">{name}</p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <h3 className="text-26-semibold line-clamp-1">{title}</h3>
          </Link>
        </div>
        <Link href={`/user/${authorId}`}>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt="author-img"
              height={100}
              width={100}
              className="h-12 w-12 rounded-full object-fill"
            />
          ) : (
            <span className="rounded-full py-2 px-3 bg-blue-400 text-white font-semibold">
              {name?.[0]}
            </span>
          )}
        </Link>
      </div>
      <Link href={`/startup/${_id}`}>
        <p className="startup-card_desc">{description}</p>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="placeholder"
            className="startup-card_img"
            height={300}
            width={300}
          />
        ) : (
          <Image
            src={"https://placehold.co/300x200"}
            alt="placeholder"
            className="startup-card_img"
            height={300}
            width={300}
          />
        )}
      </Link>
      <div className="flex-between gap-3 mt-5">
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className="text-16-medium">{category}</p>
        </Link>
        <button className="startup-card_btn">
          <Link href={`/startup/${_id}`}>Details</Link>
        </button>
      </div>
    </li>
  );
};

export default StartupCard;