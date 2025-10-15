## 2025-10-15
- progress so far.
    - added a compositionRegistry.ts which is used in the Root.tsx to get all available components into the remoteion player.
    - added a MasterSequenceComp.tsx that uses the transcript.json in /public folder to assemble scenes. the transcript.json is derived from the LLM which is fed an audio transcript with available compositions in remotion
- i have another repo for shotlist_prompt_generation that crafts a prompt by pinging this remotion project for available compositions and send the transcript along with the available compositions to the llm. returned json is stored as transcript.json.

- i need to work on refining the designs of the compositions before adding more and continue work.
    - 
