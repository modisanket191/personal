// General portfolio JavaScript
// Chess functionality remains isolated in assets/js/chess.js.

(() => {
  'use strict';

  const mojibakeReplacements = [
    ['ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â·', ' - '],
    ['ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â', ' - '],
    ['ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â', ' -> '],
    ['ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œ', ' -> '],
    ['ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢', ' -> '],
    ['ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Â¢', "'"],
    ['ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢', "'"],
    ['ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢Ãƒâ€¦Ã‚Â¸', 'Chess'],
    ['ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¦', '...'],
    ['ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â©', '(c)']
  ];
  const repairMojibake = value => mojibakeReplacements.reduce(
    (repaired, [garbled, clean]) => repaired.replaceAll(garbled, clean),
    value
  );

  const textWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  while (textWalker.nextNode()) textNodes.push(textWalker.currentNode);
  textNodes.forEach(node => {
    node.nodeValue = repairMojibake(node.nodeValue);
  });
  document.title = repairMojibake(document.title);
  document.querySelectorAll('meta[content]').forEach(meta => {
    meta.content = repairMojibake(meta.content);
  });

  // General site behavior can be added here without mixing it with Chess.com logic.
})();
