import Image from "next/image";

export default function BotEmoji() {
  return (
    <Image 
      src="https://twemoji.maxcdn.com/v/latest/svg/1f916.svg" 
      alt="Robot Emoji" 
      width={24} 
      height={24} 
    />
  );
}
