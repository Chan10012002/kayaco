<script lang="ts">
  import { cn } from "$lib/utils";
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";

  export let words: string[] = ["From Challenge to Opportunity ✨", "Kayamo?", "Kasi Kayaco!"];
  export let duration: number = 2100;

  let className: string = "";
  export { className as class };

  let index = 0;
  let chnageIndex = () => {
    index = (index + 1) % words.length;
  };
  onMount(() => {
    let interval = setInterval(chnageIndex, duration);
    return () => clearInterval(interval);
  });
  const highlightWord = (word: string) => {
    let styled = word;

    styled = styled.replace(
      "Opportunity",
      `<span class="text-sky-400">Opportunity</span>`
    );
    styled = styled.replace(
      "Kayaco",
      `<span class="text-sky-400">Kayaco</span>`
    );

    return styled;
  };
</script>

<div class="overflow-hidden py-2">
  {#key index}
    <h1
      in:fly={{ y: -50, delay: 200 }}
      out:fly={{ y: 40, duration: 200 }}
      class={cn(className, "text-center")}
    >
      {@html highlightWord(words[index])}
    </h1>
  {/key}
</div>
