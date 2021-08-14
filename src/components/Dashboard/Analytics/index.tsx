const index = () => {
  return (
    <div>
      <iframe
        plausible-embed="true"
        src="https://plausible.io/share/formulastocks.com?auth=DC44D8p7T-nPreq68XB7i&embed=true&theme=light"
        scrolling="no"
        frameBorder="0"
        loading="lazy"
        style={{ width: '1px', minWidth: '100%', height: '1600px' }}
      ></iframe>
      <div style={{ fontSize: 14, paddingBottom: 14 }}>
        Stats powered by{' '}
        <a target="_blank" style={{ color: '#4F46E5', textDecoration: 'underline' }} href="https://plausible.io">
          Plausible Analytics
        </a>
      </div>
      <script async src="https://plausible.io/js/embed.host.js"></script>
    </div>
  )
}

export default index
