<!--
  @component
  Generates an SVG radar chart.
 -->
<script>
  import { getContext } from 'svelte';
  import { line, curveCardinalClosed } from 'd3-shape';

  const { data, width, height, xGet, config } = getContext('LayerCake');

  let {
    fill = '#f0c',
    stroke = '#f0c',
    strokeWidth = 2,
    r = 4.5,
    fillOpacity = 0.5,
    circleFill = '#f0c',
    circleStroke = '#fff',
    circleStrokeWidth = 1
  } = $props();

  let angleSlice = $state((Math.PI * 2) / $config.x.length);

  let path = $state(line());
  path
    .curve(curveCardinalClosed)
    .x((d, i) => d * Math.cos(angleSlice * i - Math.PI / 2))
    .y((d, i) => d * Math.sin(angleSlice * i - Math.PI / 2));

  /* The non-D3 line generator way. */
  // $: path = valus => 'M' + values
  //   .map(d => {
  //     return $rGet(d).map((val, i) => {
  //       return [
  //         val * Math.cos(angleSlice * i - Math.PI / 2),
  //         val * Math.sin(angleSlice * i - Math.PI / 2)
  //       ].join(',');
  //     });
  //   })
  //   .join('L') + 'z';
</script>

<g transform="translate({$width / 2}, {$height / 2})">
  {#each $data as row}
    {@const xVals = $xGet(row)}
    <!-- Draw a line connecting all the dots -->
    <path
      class="path-line"
      d={path(xVals)}
      {stroke}
      stroke-width={strokeWidth}
      {fill}
      fill-opacity={fillOpacity}
    ></path>

    <!-- Plot each dots -->
    {#each xVals as circleR, i}
      {@const thisAngleSlice = angleSlice * i - Math.PI / 2}
      <circle
        cx={circleR * Math.cos(thisAngleSlice)}
        cy={circleR * Math.sin(thisAngleSlice)}
        {r}
        fill={circleFill}
        stroke={circleStroke}
        stroke-width={circleStrokeWidth}
      ></circle>
    {/each}
  {/each}
</g>

<style>
  .path-line {
    stroke-linejoin: round;
    stroke-linecap: round;
  }
</style>
