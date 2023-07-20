import { createClient , LiveList} from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

type Presence = {
  isTyping: boolean;
};

type Storage = {
  todos: LiveList<{ text: string }>;
};

const client = createClient({
  publicApiKey: "pk_dev_jvct0BfUO2ARh8Pns9zG2oshrNCbCRWzuPD9jfj8JtaoyReQNqSw-KAABiMT-fVq",
});

export const {
  suspense: {
    RoomProvider,
    useOthers,
    useUpdateMyPresence,
    useStorage,
    useMutation,
  },
} = createRoomContext<Presence, Storage>(client); 