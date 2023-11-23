class Node
{
	constructor(text)
	{
		this.message = text;
	}

	static makeForChar = function (i)
	{
		return new Node(String.fromCharCode(i));
	}

	print = function (printValue)
	{
		console.info("%o", this.message);
		return this.message;
	}
}


let makeLinkedList = function ()
{
	let node = null;
	let first = null;

	let startIndex = 65;                // A
	let stopIndex = startIndex + 25;    // Z

	let i = startIndex;
	while (i < stopIndex)
	{
		if (!node) node = Node.makeForChar(i);
		if (!first) first = node;
		node.next = Node.makeForChar(i + 1);
		node = node.next;
		i++;
	}
	return first;
};


let printList = function (listNode)
{
	let node = listNode;
	while (node)
	{
		node.print();
		node = node.next;
	}
};

let reverseList = function (node)
{
	if (!node) return node;         // a list that is falsy should throw an error...
	if (!node.next) return node;    // a list of 1 is already reversed

	let prev = null;
	let next = null;

	do {
		next = node.next;
		node.next = prev;
		prev = node;
		if(next) node = next;
	} while (next);
	return node;
};

let n = makeLinkedList();

printList(n);
n = reverseList(n);
console.log("Reversed");
printList(n);