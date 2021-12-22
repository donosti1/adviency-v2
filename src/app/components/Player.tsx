import React, { useState, useEffect } from "react";
import { Button, Icon } from "@chakra-ui/react";
import { MdOutlineVolumeUp, MdOutlineVolumeOff } from "react-icons/md";
//import soundTrack from "/bg-sound.mp3";

const audio = new Audio("/bg-sound.mp3");

audio.volume = 0.2;
const AudioTest = () => {
  const [playing, setPlaying] = React.useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);

  useEffect(() => {
    audio.addEventListener(
      "ended",
      function () {
        this.currentTime = 0;
        this.play();
      },
      false
    );

    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, []);

  return (
    <Button variant="unstyled" onClick={toggle}>
      {playing ? (
        <Icon as={MdOutlineVolumeOff} />
      ) : (
        <Icon as={MdOutlineVolumeUp} />
      )}
    </Button>
  );
};
/* const Player = ({ url }: { url: string }) => {
  const useAudio = (url: string) => {
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);

    const toggle = () => setPlaying(!playing);

    useEffect(() => {
      playing ? audio.play() : audio.pause();
    }, [playing]);

    useEffect(() => {
      audio.addEventListener("ended", () => setPlaying(false));

      return () => {
        audio.removeEventListener("ended", () => setPlaying(false));
      };
    }, []);

    return [playing, toggle];
  };

  console.log(url);
  const [playing, toggle] = useAudio(url);

  return <Button onClick={() => toggle}>{playing ? "Pause" : "Play"}</Button>;
}; */

export default AudioTest;
