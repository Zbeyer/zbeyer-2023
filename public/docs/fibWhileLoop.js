let print = function (printValue)
{
	console.log("%o", printValue);
	return printValue;
};

let fib = function (index)
{
	if (index < 0)	 	return 0;
	if (index <= 1) 	return 1;

	let val 	= 1;
	let prev 	= 1;
	let fib 	= val + prev;
	let i 	= 2;

	while (i < index)
	{
		i++;
		prev 	= val;
		val 	= fib;
		fib 		= val + prev;
	}
	return fib;
};

let f = 0;
for (let i = 0; i <= 20; i++)
{
	f =  fib(i);
	print(i + " : " + f);
};