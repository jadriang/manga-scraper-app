<script lang="ts">
	import type { PageData } from './$types';
	import type { Manga } from '$lib/types';

	export let data: PageData;

	let searchTerm = '';

	$: filteredMangas = data.mangas.filter(
		(manga: Manga) =>
			manga.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			manga.source.toLowerCase().includes(searchTerm.toLowerCase())
	);

	function formatDate(dateString: string): string {
		if (!dateString) return 'N/A';
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}

	function getSourceColor(source: string): string {
		const colors: { [key: string]: string } = {
			demonicscans: 'bg-purple-100 text-purple-700 border-purple-200'
		};
		return colors[source.toLowerCase()] || 'bg-blue-100 text-blue-700 border-blue-200';
	}
</script>

<svelte:head>
	<title>Manga Tracker</title>
	<meta name="description" content="Track your favorite manga chapters" />
</svelte:head>

<div class="container mx-auto px-4 py-8 max-w-7xl">
	<!-- Header -->
	<header class="text-center mb-8">
		<h1 class="text-5xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
			<span class="text-6xl">📚</span>
			<span>Manga Tracker</span>
		</h1>
		<p class="text-xl text-gray-600 mt-2">Track your favorite manga chapters</p>
	</header>

	<!-- Search Bar -->
	<div class="mb-8">
		<div class="relative max-w-2xl mx-auto">
			<div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
				<svg
					class="h-5 w-5 text-gray-400"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/>
				</svg>
			</div>
			<input
				type="text"
				placeholder="Search by title or source..."
				bind:value={searchTerm}
				class="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm hover:shadow-md"
			/>
		</div>
	</div>

	<!-- Stats Cards -->
	<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
		<div
			class="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 hover:shadow-lg transition-shadow"
		>
			<div class="flex items-center justify-between">
				<div>
					<p class="text-gray-500 text-sm font-medium uppercase tracking-wide">Total Mangas</p>
					<p class="text-4xl font-bold text-gray-800 mt-2">{data.mangas.length}</p>
				</div>
				<div class="bg-blue-100 p-4 rounded-full">
					<span class="text-3xl">📖</span>
				</div>
			</div>
		</div>

		<div
			class="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500 hover:shadow-lg transition-shadow"
		>
			<div class="flex items-center justify-between">
				<div>
					<p class="text-gray-500 text-sm font-medium uppercase tracking-wide">Showing</p>
					<p class="text-4xl font-bold text-gray-800 mt-2">{filteredMangas.length}</p>
				</div>
				<div class="bg-green-100 p-4 rounded-full">
					<span class="text-3xl">✅</span>
				</div>
			</div>
		</div>

		<div
			class="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500 hover:shadow-lg transition-shadow"
		>
			<div class="flex items-center justify-between">
				<div>
					<p class="text-gray-500 text-sm font-medium uppercase tracking-wide">Total Chapters</p>
					<p class="text-4xl font-bold text-gray-800 mt-2">
						{data.mangas.reduce((sum, manga) => sum + (manga.latest_chapter || 0), 0)}
					</p>
				</div>
				<div class="bg-purple-100 p-4 rounded-full">
					<span class="text-3xl">📚</span>
				</div>
			</div>
		</div>
	</div>

	<!-- Manga Grid -->
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
		{#each filteredMangas as manga (manga.id)}
			<div
				class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:-translate-y-1"
			>
				<!-- Card Header -->
				<div class="bg-gradient-to-r from-blue-500 to-purple-600 p-4">
					<h2 class="text-xl font-bold text-white line-clamp-2">{manga.title}</h2>
				</div>

				<!-- Card Body -->
				<div class="p-5">
					<!-- Source Badge -->
					<div class="mb-4">
						<span
							class="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold border {getSourceColor(
								manga.source
							)}"
						>
							<span class="mr-1">🌐</span>
							{manga.source}
						</span>
					</div>

					<!-- Info Grid -->
					<div class="space-y-3 mb-5">
						<div class="flex items-center justify-between">
							<span class="text-gray-600 text-sm font-medium">Latest Chapter:</span>
							<span class="text-2xl font-bold text-blue-600">
								{manga.latest_chapter || 'N/A'}
							</span>
						</div>

						<div class="flex items-start justify-between">
							<span class="text-gray-600 text-sm font-medium">Last Checked:</span>
							<span class="text-xs text-gray-500 text-right max-w-[60%]">
								{formatDate(manga.last_checked)}
							</span>
						</div>

						<div class="flex items-start justify-between">
							<span class="text-gray-600 text-sm font-medium">Updated:</span>
							<span class="text-xs text-gray-500 text-right max-w-[60%]">
								{formatDate(manga.updated_at)}
							</span>
						</div>
					</div>

					<!-- Action Buttons -->
					<div class="flex flex-col gap-2">
						<a
							href={manga.url}
							target="_blank"
							rel="noopener noreferrer"
							class="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors shadow-sm hover:shadow-md"
						>
							<svg
								class="w-5 h-5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
								/>
							</svg>
							View Manga
						</a>

						{#if manga.chapter_url}
							<a
								href={manga.chapter_url}
								target="_blank"
								rel="noopener noreferrer"
								class="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors shadow-sm hover:shadow-md"
							>
								<svg
									class="w-5 h-5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
									/>
								</svg>
								Read Chapter {manga.latest_chapter}
							</a>
						{:else}
							<button
								disabled
								class="w-full bg-gray-300 text-gray-500 font-semibold py-3 px-4 rounded-lg cursor-not-allowed opacity-60"
							>
								No Chapter Available
							</button>
						{/if}
					</div>
				</div>
			</div>
		{:else}
			<div class="col-span-full">
				<div class="bg-white rounded-xl shadow-md p-12 text-center">
					<div class="text-6xl mb-4">🔍</div>
					<p class="text-xl text-gray-600">No manga found matching "{searchTerm}"</p>
					<button
						on:click={() => (searchTerm = '')}
						class="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
					>
						Clear Search
					</button>
				</div>
			</div>
		{/each}
	</div>

	<!-- Footer -->
	<footer class="mt-12 text-center text-gray-500 text-sm">
		<p>Last updated: {new Date().toLocaleString('en-US', { 
			year: 'numeric', 
			month: 'long', 
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		})}</p>
	</footer>
</div>