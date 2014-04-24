import pylab
from pylab import *
from scipy import *
from scipy import optimize
import math



xdata = [216,1296,7776,46656,279936,1679616]
ydata = [0.0,0.01,0.21,8.41,343.62,13941.33]


def rise(N):
  return (1.91*10**(-``9))*(N**2.066)


y = []
for x in xdata:
  y.append(rise(x))



def err(y1,y2):
  l = len(y1)
  i = 0
  sum = 0
  while i < l :
    sum += (y1[i]-y2[i])**2
    i += 1      

  sum = sum/l
  return math.sqrt(sum)    

print(y)
print(err(ydata,y))


 

# xdata_log = []
# for x in xdata:
#   xdata_log.append(math.log(x,3))


# ydata_log = []
# for y in ydata:
#   ydata_log.append(math.log(y,3))

# xs = pylab.array(xdata_log)
# ys = pylab.array(ydata_log)

# t = pylab.polyfit(xs,ys,1,full=False)


# print(t)