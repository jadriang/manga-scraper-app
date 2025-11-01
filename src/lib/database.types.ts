export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export interface Database {
	public: {
		Tables: {
			mangas_rows: {
				Row: {
					id: string;
					title: string;
					source: string;
					url: string;
					chapter_url: string | null;
					latest_chapter: number;
					last_checked: string;
					created_at: string;
					updated_at: string;
				};
				Insert: {
					id?: string;
					title: string;
					source: string;
					url: string;
					chapter_url?: string | null;
					latest_chapter?: number;
					last_checked?: string;
					created_at?: string;
					updated_at?: string;
				};
				Update: {
					id?: string;
					title?: string;
					source?: string;
					url?: string;
					chapter_url?: string | null;
					latest_chapter?: number;
					last_checked?: string;
					created_at?: string;
					updated_at?: string;
				};
			};
		};
	};
}