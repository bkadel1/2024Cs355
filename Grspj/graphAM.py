"""
   Execution:    python graph.py input.txt
   Data files:   tinyG.txt
 
   A graph, implemented using an array of sets.
 
   % python graph.py < tinyG.txt
   13 vertices, 13 edges 
   0: 6 2 1 5 
   1: 0 
   2: 0 
   3: 5 4 
   4: 5 6 3 
   5: 3 4 0 
   6: 0 4 
   7: 8 
   8: 7 
   9: 11 10 12 
   10: 9 
   11: 9 12 
   12: 11 9 
 
 """
import sys

class Graph:

    def __init__(self, v=None, filename=None):
        if filename is None:
            self.V = v
            self.E = 0
            self.adj = [[0 for _ in range(self.V)] for _ in range(self.V)]
        else:
            infile = open(sys.argv[1], "r")
            self.V = int(infile.readline())
            self.E = int(infile.readline())
            
            self.adj = [[0 for _ in range(self.V)] for _ in range(self.V)]
            for _ in range(self.E):
                v, w = infile.readline().split()
                self.add_edge(v, w)            
            infile.close()            

    def __str__(self):
        s = "%d vertices, %d edges\n" % (self.V, self.E)
        s += "\n".join("%d: %s" % (v, " ".join(str(w)
                   for w in self.adj[v])) for v in range(self.V))
        return s

    def add_edge(self, v, w):
        v, w = int(v), int(w)
        self.adj[v][w] = 1
        self.adj[w][v] = 2
        self.E += 1
        
    def adjacent(self, v):
        return self.adj[v]


if __name__ == '__main__':
    g = Graph(None, sys.argv[1])

    print(g)
    
