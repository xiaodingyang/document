interface Card {
  suit: string;
}
interface Deck {
  suits: string[];
  create(this: Deck): () => void;
}
let deck: Deck = {
  suits: ["aaa", "bbb"],
  create: function() {
    console.log(this);
  }
};
