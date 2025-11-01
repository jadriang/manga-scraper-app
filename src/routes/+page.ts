export const prerender = true;
export const ssr = false;

import { supabase } from '$lib/supabaseClient';
import type { Manga } from '$lib/types';

export async function load(): Promise<{ mangas: Manga[] }> {
	const { data: mangas, error } = await supabase
		.from('mangas')
		.select('*')
		.order('updated_at', { ascending: false });

	if (error) {
		console.error('Error fetching mangas:', error);
		return {
			mangas: []
		};
	}

	return {
		mangas: (mangas as Manga[]) || []
	};
}