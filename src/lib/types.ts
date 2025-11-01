export interface Manga {
	id: string;
	title: string;
	source: string;
	url: string;
	chapter_url: string | null;
	latest_chapter: number;
	last_checked: string;
	created_at: string;
	updated_at: string;
}