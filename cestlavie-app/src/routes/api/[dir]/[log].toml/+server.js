import { parse } from 'smol-toml';
import { json } from '@sveltejs/kit';

export const prerender = true;

export const GET = async ({ fetch, params }) => {
  // fetch the file as a text and then parse it with the library
  let res = await fetch(`../../content/${params.dir}/${params.log}.toml`);
  res = await res.text();
  const toml = parse(res);

  // create a proper Response object for the json
  return json(toml);
};

/** @type {import('./$types').EntryGenerator} */
export function entries() {
  return [{ dir: 'scrapbook', log: 'stub_text_extraction' }];
}
