class ShareUrl extends HTMLElement {

  // Setup
  constructor() {
    super();

    this.options = {
      selector: '.share-url',
      activeClass: 'is-active',
      action: 'share',
      url: document.location.href,
      title: document.title,
      urlParameter: 'url',
      titleParameter: 'text',
      textSelector: null,
      textLabel: '',
      textSuccess: 'Shared',
      maintainSize: false,
    }

    this.platforms = [{ name: 'bluesky', url: 'https://bsky.app/intent/compose', urlParameter: '' }, { name: 'facebook', url: 'https://facebook.com/sharer/sharer.php', titleParameter: 't', urlParameter: 'u' }, { name: 'linkedin', url: 'https://www.linkedin.com/shareArticle?mini=true' }, { name: 'reddit', url: 'https://www.reddit.com/submit', titleParameter: 'title' }, { name: 'twitter', url: 'https://twitter.com/intent/tweet' }, { name: 'threads', url: 'https://www.threads.net/intent/post' }];


    this.setup();
  }

  connectedCallback() {
    this.setup();
  }

  setup() {
    if (this._instantiated) return;

    this.element = this.querySelector('button, a');
    if (!this.element) return;

		for (const item of this.getAttributeNames()) {
      let prop = this.camelCase(item);
      let value = this.checkBoolean(this.getAttribute(item));
      this.options[prop] = value;
		}

    if (this.element.href && !this.getAttribute('action')) this.options.action = this.element.href;

    this.textElement = this.querySelector(this.options.textSelector);
    if (this.textElement === null) this.textElement = this.element;
    if (this.options.textLabel) this.textElement.innerText = this.options.textLabel;

    if (this.options.action === 'share' || this.options.action === 'clipboard') {
      navigator[this.options.action] ? this.element.addEventListener('click', () => this.shareEvent()) : this.setFallback();
    }
    else {
      this.element.addEventListener('click', (event) => this.sharePlatform(event));
    }

    this._instantiated = true;
  }


  // Utilities
  checkBoolean(string) {
	  if (string.toLowerCase() === 'true') return true;
	  if (string.toLowerCase() === 'false') return false;
		return string;
  }

  isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } 
    catch (error) {
      return false;
    }
  }

  setFallback() {
    if (this.element.querySelector('fallback') !== null) {
      this.element.classList.add('is-fallback');
    }
    else {
      this.style.display = 'none';
    }
  };

  camelCase(text, delimiter = '-') {
    const pattern = new RegExp((`${delimiter}([a-z])`), 'g');
    return text.replace(pattern, (match, replacement) => replacement.toUpperCase());
  }


  // Methods
  async shareEvent() {
    try {
      if (this.options.action === 'share') await navigator.share({ title: this.options.title, text: this.options.title, url: this.options.url });
      if (this.options.action === 'clipboard') await navigator.clipboard.writeText(this.options.url);

      this.shareSuccess();
    } 
    catch (error) {
      if (error.name !== 'AbortError') console.error(error.name, error.message);
    }
  }

  sharePlatform(event) {
    event.preventDefault();

    let platformData = this.platforms.find((item) => item.name === this.options.action);
    if (platformData) {
      this.options.action = platformData.url;
      this.options.urlParameter = platformData.urlParameter ?? this.options.urlParameter;
      this.options.titleParameter = platformData.titleParameter ?? this.options.titleParameter;
    }

    if (this.options.action === 'mastodon') {
      let mastodonInstance = localStorage.getItem('mastodon-instance');

      if (!mastodonInstance) {
        let mastodonPrompt = prompt('Enter your Mastodon instance');
        if (mastodonPrompt === '' || mastodonPrompt === null) return;

        localStorage.setItem('mastodon-instance', mastodonPrompt);
        mastodonInstance = localStorage.getItem('mastodon-instance');
      }

      this.options.action = `https://${mastodonInstance}/share`;
    }

    if (!this.isValidUrl(this.options.action)) return;

    const platformURL = new URL(this.options.action);

    if (this.options.urlParameter === '') { 
      this.options.title += ` ${this.options.url}`;
    }
    else {
      platformURL.searchParams.append(this.options.urlParameter, this.options.url);
    }

    platformURL.searchParams.append(this.options.titleParameter, this.options.title);

    window.open(platformURL.href, '_blank', 'noreferrer,noopener');
    this.shareSuccess();
  }

  shareSuccess() {
    let textWidth = this.textElement.offsetWidth;
    this.textElement.innerText = this.options.textSuccess;
    if (this.options.maintainSize) this.textElement.style.width = `${Math.max(textWidth, this.textElement.offsetWidth)}px`;
    this.element.classList.add(this.options.activeClass);
  }

}

customElements.define('share-url', ShareUrl);
export { ShareUrl };
