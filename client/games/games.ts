import Game from "./game";

class SlideMatch extends Game { constructor() { super("SlideMatch"); } }
class MatchThree extends Game { constructor() { super("MatchThree"); } }
class RowFill extends Game { constructor() { super("RowFill"); } }

export {
	RowFill,
	MatchThree,
	SlideMatch,
};
