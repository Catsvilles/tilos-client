<script>
  import { hiddenShows } from './stores';

  export let id;
  export let name;
  export let definition;
  export let type;
  export let status;
  export let alias;

  $: isHidden = $hiddenShows.indexOf(id) > -1;

  const toggleHiddenShow = () => {
    if (isHidden) {
      $hiddenShows = $hiddenShows.filter(showId => showId !== id);
    } else {
      $hiddenShows = [...$hiddenShows, id];
    }
  };
</script>

<style>
  .unwanted {
    opacity: .4;
  }

</style>


<div class:unwanted={isHidden}>
  <h2><a rel='prefetch' href="shows/{alias}">{name}</a></h2>
  <div>{type} | {status}</div>
  <p>{definition}</p>
</div>
<button type="button" on:click={toggleHiddenShow}> {isHidden ? 'Megjelenítés' : 'Elrejtés' }</button>
<hr>
