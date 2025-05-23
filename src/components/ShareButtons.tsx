// src/components/ShareButtons.jsx

export const ShareButtons = () => {
  const shareOnTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(document.title);
    window.open(
      // TODO: change twitter to x and remove text
      `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      "_blank",
    );
  };

  // const shareOnLinkedIn = () => {
  //   const url = encodeURIComponent(window.location.href);
  //   window.open(
  //     `https://linkedin.com/sharing/share-offsite/?url=${url}`,
  //     "_blank",
  //   );
  // };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      // You could add a SolidJS-specific toast notification here,
    });
  };

  return (
    <div class="flex items-center justify-between mb-8">
      <h3 class="text-lg font-semibold text-slate-900 dark:text-white">
        Share this article
      </h3>
      <div class="flex items-center space-x-4">
        <button
          on:click={shareOnTwitter}
          class="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200"
        >
          <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"
            ></path>
          </svg>
          Twitter
        </button>

        {/*  <button
          on:click={shareOnLinkedIn}
          class="flex items-center px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-colors duration-200"
        >
          <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 2a2 2 0 100 4 2 2 0 000-4z"
            ></path>
          </svg>
          LinkedIn
        </button>
*/}
        <button
          on:click={copyToClipboard}
          class="flex items-center px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors duration-200"
        >
          <svg
            class="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            ></path>
          </svg>
          Copy Link
        </button>
      </div>
    </div>
  );
};

export default ShareButtons;
