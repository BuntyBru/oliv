/*
E = {name: "E"},
F = {name: "F",children:[]},
C = {name: "C", children:[E,F]},
D = {name: "D",children:[]},          
B = {name: "B", children: [D]},
A = {name: "A", children: [B, C]}


I = {name: "I",children:[]},
 J = {name: "J",children:[]},
H = {name: "H", children: [I,J]},
G = {name: "G", children: [H]},
Obj = {name: "Object",children:[A, G]},
Root = Obj,

 I & J = H
  D & E & F = A
  D & I & F = Object
*/
class Graph
{
	constructor()
	{
		this.hashMap={};
	}

	addVertex(vertex)
	{
		this.hashMap[vertex] =[];
	}

	addEdge(v1,v2)
	{
		this.hashMap[v1].push(...v2);
	}

	Traversal(start)
	{
		let result={};
		let visited =[];
		const adjacencyList = this.hashMap;
		let index =0;
		let parent = null;
		
		
		(function finaldfs(vertex)
		{
			if(!vertex) return false;
			visited[vertex]=true;
			result[vertex] = {index:index,parent:parent,children:adjacencyList[vertex]};
			index= index+1;
			adjacencyList[vertex].forEach(neighbour => {
				if(!visited[neighbour])
				{
					parent = vertex;
					return finaldfs(neighbour);
				}
			})
		})(start); 
	return result;
	}
	

	TraversalPath(start,mainList)
	{

		const adjacencyList = this.hashMap;
		let result=[];
		let visited=[];
		function visitedKeys(x,arr)
		{
			if (!mainList[x]) return true;
			if(mainList[x].children.length == 0)
			{
				return true;
			}

			let t=0;
			let f=0;
			for(let i =0 ;i < mainList[x].children.length;i++)
			{
				if(arr[mainList[x].children[i]]!== true)
				{
					f+=1;
				}
				else
				{
					t+=1;
				}
			}
			if(t ==  mainList[x].children.length)
			{
				return true;
			}
			else if(f ==  mainList[x].children.length)
			{
				return false;
			}
		}
		result.push(start);
		(function finalPath(vertex){
			visited[vertex]=true;
			
			adjacencyList[vertex].forEach(n => {
				
				if(adjacencyList[n].length ==0)
				{
					
					let  x = n;
					result.push(x);
					visited[x]=true;
					while(x !== vertex)
					{
						x = mainList[n].parent;
						result.push(x);
						visited[x]=true;
					}
					let mt = vertex
					if(visitedKeys(vertex,visited))
						{
							result.push(mainList[mt].parent);
							mt = mainList[mt].parent;
							while(visitedKeys(mt,visited) == true )
							{
								if(mainList[mt].parent)
								{	
									mt = mainList[mt].parent;
									result.push(mt);
								}
								else
								{
									return;
								}

							}
						}
					
				}

				else
				{
					result.push(n);
					visited[n]=true;
					return finalPath(n);
				}


			})
		})(start);
		return result;
	}

	


}

let g = new Graph();
g.addVertex('Obj');
g.addVertex('A');
g.addVertex('B');
g.addVertex('C');
g.addVertex('D');
g.addVertex('E');
g.addVertex('F');
g.addVertex('G');
g.addVertex('H');
g.addVertex('I');
g.addVertex('J');

g.addEdge('Obj',['A','G'])
g.addEdge('A',['B','C']);
g.addEdge('B',['D']);
g.addEdge('C',['E','F']);
g.addEdge('G',['H']);
g.addEdge('H',['I','J']);
let t = g.Traversal('Obj');
let m = g.TraversalPath('Obj',t).map((x)=>{
	return t[x].index
});
function findParents(arr)
{
let newArr = arr.map(x=>{
	return t[x].index;
});
console.log(newArr);
let indexes=[];
newArr.forEach((x)=>{
	indexes.push(m.indexOf(x));
})
console.log(m);
console.log(indexes);
indexes.sort(function(a, b){return a - b});

//Taking out the array window and sorting it
let finalArray = m.slice(indexes[0],indexes[indexes.length-1]+1);
console.log("==>Final",finalArray);
finalArray.sort(function(a, b){return a - b})
console.log("==>Final",finalArray);
//Final step
for(let i in t)
{
	if (t[i].index == finalArray[0])
	{
		console.log("The parent is ",i);
		return;
	}
}

}

//Enter the array
findParents(['D','I','F'])

/*
Output frm the above  [ 'Obj', 'A', 'B', 'D', 'C', 'E', 'F', 'G', 'H', 'I', 'J' ]
Arranging index to it [	 0,		1,   2,   3,   4,   5,   6,   7,   8,   9,  10  ]
Traversal array == [ 0,1,2,3,2,1,4,5,4,6,4,1,0,7,8,9,8,10,8,7,0]
				Obj,A,B,D,B,A,C,E,C,F,C,A,Obj,G,H,I,H,J,H,G,Obj
				  0,1,2,3,2,1,4,5,4,6,4,1,0  ,7,8,9,8,10,8,7,0     




Find Parents
I & J = H
  D & E & F = A
  D & I & F = Object

Now suppose we want to know about the parent of I and J 
I = 9 and J = 10
So now we will check the first occurence of 9 and 10 , in the traversal array
We will take out the window of elements from the traversal array
which is [9,8,10]

now going by the rule that Parent(index) < Child (index)
8 is the smallest number, Hence 'H' is the answer
*/