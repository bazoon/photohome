def swapSort(L): 
    """ L is a list on integers """
    print "Original L: ", L
    count = 0
    for i in range(len(L)):
        for j in range(i+1, len(L)):
            if L[j] < L[i]:
                count +=1
                # the next line is a short 
                # form for swap L[i] and L[j]
                L[j], L[i] = L[i], L[j] 
             
    print "Final L: ", L
    print count


def modSwapSort(L): 
    """ L is a list on integers """
    print "Original L: ", L
    count = 0
    print range(len(L))
    for i in range(len(L)):
        for j in range(len(L)):
            if L[j] < L[i]:
                # the next line is a short 
                # form for swap L[i] and L[j]
                count +=1
                L[j], L[i] = L[i], L[j] 
             
    print "Final L: ", L
    print count


# swapSort([15,14,13,12,11,10,9,8,7,6,5,4,3,2,1])
# modSwapSort([15,14,13,12,11,10,9,8,7,6,5,4,3,2,1])

swapSort([1,2,3,4,5,6,7,8,9,10])
swapSort([10,9,8,7,6,5,4,3,2,1])

modSwapSort([10,9,8,7,6,5,4,3,2,1])
modSwapSort([1,2,3,4,5,6,7,8,9,10])