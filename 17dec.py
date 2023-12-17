import heapq
from collections import defaultdict
import pprint

f = open("./samples/17dec.txt", "r")
T = f.read().splitlines()
graph = {}
i = 0


while i < len(T):
    j = 0
    for h in [*T[i]]:
        graph[(j, i)] = {
            "heatLoss": int(h),
            "col": j,
            "row": i,
            "horizontalDirection": 0,
            "verticalDirection": 0,
            "length": 0,
        }
        j += 1
    i += 1
pprint.pprint(graph)

startPos = (0, 0)
endPos = (j, i)


def dijkstra():
    visited = list()
    parentsMap = {}
    queue = []
    heatLosses = defaultdict()
    heatLosses[startPos] = 0
    heapq.heappush(queue, (0, startPos))

    while queue:
        _, node = heapq.heappop(queue)
        visited.add(node)

        for item in graph[node].items():
            if (item.x, item.y) in visited:
                continue

            for (x,y) in 
            newHeatLoss = heatLosses[node] + adjNode.heatLoss
            if heatLosses[adjNode] > newHeatLoss:
                parentsMap[adjNode] = node
                heatLosses[adjNode] = newHeatLoss
                heapq.heappush(queue, (newHeatLoss, adjNode))
    return 0


print("part 1 => ", dijkstra())


# https://docs.python.org/3/library/heapq.html#module-heapq
