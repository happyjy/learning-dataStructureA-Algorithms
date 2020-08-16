console.log('### Graph');

/**
    #1. 무지향성 그래프
      #1.1 간선과 정점 추가하기
      #1.2 간선과 정점 삭제하기

    #2. 지향성 그래프: 정점간 방향이 있는 그래프
      #2.1 간선과 정점 추가하기
      #2.2 간선과 정점 삭제하기

    #3. 그래프 순회
      #3.1 너비 우선 검색
      #3.2 깊이 우선 검색

    #4. 가중치가 있는 그래프와, 최단 경로
      #4.1 가중치가 있는 간선을 지닌 그래프
      #4.2 다익스트라의 알고리즘(Dijkstra)
    #5. 위상정렬
 */

// # 정점(vertex): 그래프를 형성하는 노드
// # 간선(edge): 노드(정점)간의 연결

//#1. 무지향성 그래프
function UndirectedGraph() {
	this.edges = {};
}
//#1.1 간선과 정점 추가하기
UndirectedGraph.prototype.addVertex = function(vertex) {
	this.edges[vertex] = {};
};
UndirectedGraph.prototype.addEdge = function(vertex1, vertex2, weight = undefined) {
	this.edges[vertex1][vertex2] = weight;
	this.edges[vertex2][vertex1] = weight;
};

debugger;
console.log('### graph1: addVertex, addEdge');
var graph1 = new UndirectedGraph();
graph1.addVertex(10);
graph1.addVertex(20);
graph1.addEdge(10, 20, 1);
graph1.edges; // 10: {20: 1}, 20: {10: 1};
graph1.addVertex(30);
graph1.addVertex(40);
graph1.addVertex(50);
graph1.addEdge(20, 30, 8);
graph1.addEdge(30, 40, 9);
graph1.addEdge(40, 50, 2);
graph1.addEdge(10, 50, 7);

console.log(graph1.edges);
/*
  # graph1.edges
    10: {20: 1, 50: 7}
    20: {10: 1, 30: 8}
    30: {20: 8, 40: 9}
    40: {30: 9, 50: 2}
    50: {10: 7, 40: 2}
*/

//#1.2 간선과 정점 삭제하기
UndirectedGraph.prototype.removeVertex = function(vertex) {
	for (var adjacentVertex in this.edges[vertex]) {
		this.removeEdge(adjacentVertex, vertex);
	}
	delete this.edges[vertex];
};
UndirectedGraph.prototype.removeEdge = function(vertex1, vertex2) {
	if (this.edges[vertex1] && this.edges[vertex1][vertex2] != undefined) {
		delete this.edges[vertex1][vertex2];
	}
	if (this.edges[vertex2] && this.edges[vertex2][vertex1] != undefined) {
		delete this.edges[vertex2][vertex1];
	}
};

console.log('### graph2: addVertex, addEdge, removeEdge, removeVertex');
var graph2 = new UndirectedGraph();
graph2.addVertex(10);
graph2.addVertex(20);
graph2.addEdge(10, 20, 1);
graph2.edges; // 10: {20: 1}, 20: {10: 1};
graph2.addVertex(30);
graph2.addVertex(40);
graph2.addVertex(50);
graph2.addEdge(20, 30, 8);
graph2.addEdge(30, 40, 9);
graph2.addEdge(40, 50, 2);
graph2.addEdge(10, 50, 7);

console.log(graph2.edges);
/*
  # graph2.edges
    10: {20: 1, 50: 7}
    20: {10: 1, 30: 8}
    30: {20: 8, 40: 9}
    40: {30: 9, 50: 2}
    50: {10: 7, 40: 2}
*/

//노드 50이 가지고 있는 노드 10, 40을 제거해야 함으로
//노드 10, 40과 연결된 노드 50 data를 제거한다.
graph2.removeVertex(50);
/*
    제거 된 data => [] 참고 3군데
    10: {20: 1, [50: 7]}
    20: {10: 1, 30: 8}
    30: {20: 8, 40: 9}
    40: {30: 9, [50: 2]}
    [50: {10: 7, 40: 2}]
*/
graph2.removeVertex(10);
/*
  제거 된 data => [] 참고 2군데
    [10: {20: 1}]
    20: {[10: 1], 30: 8}
    30: {20: 8, 40: 9}
    40: {30: 9}
*/

graph2.removeEdge(20, 30);
/*
  제거 된 data => [] 참고 2군데
  # graph2.edges
    20: {[30: 8]}
    30: {[20: 8], 40: 9}
    40: {30: 9}

    20: {}
    30: {40: 9}
    40: {30: 9}
*/

//#2. 지향성 그래프: 정점간 방향이 있는 그래프
function DirectedGraph() {
	this.edges = {};
}

//#2.1 간선과 정점 추가하기
DirectedGraph.prototype.addVertex = function(vertex) {
	this.edges[vertex] = {};
};
DirectedGraph.prototype.addEdge = function(origVertex, destVertex, weight = 0) {
	this.edges[origVertex][destVertex] = weight;
};

console.log('### directGraph1: addVertex, addEdge');
const directGraph1 = new DirectedGraph();
directGraph1.addVertex('A');
directGraph1.addVertex('B');
directGraph1.addVertex('C');
directGraph1.addEdge('A', 'B', 1);
directGraph1.addEdge('B', 'C', 2);
directGraph1.addEdge('C', 'A', 3);
console.log('* directGraph1.edges', JSON.stringify(directGraph1.edges));
/*
A: {B: 1}
B: {C: 2}
C: {A: 3}
*/

//#2.2 간선과 정점 삭제하기
DirectedGraph.prototype.removeVertex = function(vertex) {
	for (let adjacentVertex in this.edges[vertex]) {
		this.removeEdge(adjacentVertex, vertex);
	}
	delete this.edges[vertex];
};
DirectedGraph.prototype.removeEdge = function(origVertex, destVertex, weight) {
	if (this.edges[origVertex] && this.edges[origVertex][destVertex] != undefined) {
		delete this.edges[origVertex][destVertex];
	}
};

debugger;
directGraph1.removeVertex('B');
console.log('* directGraph1.edges > removeVertex("B")', JSON.stringify(directGraph1.edges));
directGraph1.removeEdge('C', 'A', 3);
console.log('* directGraph1.edges > removeEdge("C", "A", 3)', JSON.stringify(directGraph1.edges));

//#3. 그래프 순회
//#3.1 너비 우선 검색
DirectedGraph.prototype.traverseBFS = function(vertex, fn) {
	let queue = [],
		visited = {};

	queue.push(vertex);
	while (queue.length) {
		vertex = queue.shift();
		if (!visited[vertex]) {
			visited[vertex] = true;
			fn(vertex);
			for (let adjacentVertex in this.edges[vertex]) {
				queue.push(adjacentVertex);
			}
		}
	}
};

const directGraph2 = new DirectedGraph();
directGraph2.addVertex('A');
directGraph2.addVertex('B');
directGraph2.addVertex('C');
directGraph2.addEdge('A', 'B', 1);
directGraph2.addEdge('B', 'C', 2);
directGraph2.addEdge('C', 'A', 3);
// directGraph2.edges -> "A":{"B":1},  "B":{"C":2},  "C":{"A":3}}
debugger;
directGraph2.traverseBFS('B', (vertex) => {
	console.log(vertex); //B -> C -> A 순으로 차례로 log에 찍힌다.
});

//#3.2 깊이 우선 검색
DirectedGraph.prototype.traverseDFS = function(vertex, fn) {
	var visited = {};
	this._traverseDFS(vertex, visited, fn);
};

DirectedGraph.prototype._traverseDFS = function(vertex, visited, fn) {
	visited[vertex] = true;
	fn(vertex);
	for (var adjacentVertex in this.edges[vertex]) {
		if (!visited[adjacentVertex]) {
			this._traverseDFS(adjacentVertex, visited, fn);
		}
	}
};

debugger;
directGraph2.traverseDFS('B', (vertex) => {
	console.log(vertex); //B -> C -> A 순으로 차례로 log에 찍힌다.
});

//#4.2 다익스트라의 알고리즘(Dijkstra)
//  : 가중치가 있는 그래프와 최단 경로
DirectedGraph.prototype.Dijkstra = function(source) {
	// create vertex set Q
	var Q = {},
		dist = {};
	``;
	for (var vertex in this.edges) {
		// unknown distances set to Infinity
		dist[vertex] = Infinity;
		// add v to Q
		Q[vertex] = this.edges[vertex];
	}
	// Distance from source to source init to 0
	dist[source] = 0;

	while (!_isEmpty(Q)) {
		var u = _extractMin(Q, dist); // get the min distance

		// remove u from Q
		delete Q[u];

		// for each neighbor, v, of u:
		// where v is still in Q.
		for (var neighbor in this.edges[u]) {
			// current distance
			var alt = dist[u] + this.edges[u][neighbor];
			// a shorter path has been found
			if (alt < dist[neighbor]) {
				dist[neighbor] = alt;
			}
		}
	}
	return dist;
};
var _isEmpty = function(obj) {};
var _extractMin = function(Q, dist) {};

//# 위상정렬
DirectedGraph.prototype.topologicalSortUtil = function(v, visited, stack) {};
DirectedGraph.prototype.topologicalSort = function(source) {};
