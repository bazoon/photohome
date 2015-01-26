class BasicStats
  attr_reader :average, :stddev

  def initialize(list)
    @list = list
  end

  def average
    @average ||= (@list.reduce(&:+)*1.0 / @list.count)
    @average
  end
  
  def stddev
    @stddev ||= Math.sqrt(@list.map { |e| (e - average)**2 }.reduce(&:+) / @list.count)
  end

end

class PearsonCorrelation
  attr_reader :covariance, :corr_calc

  def initialize(list1, list2)
    @list1 = list1
    @list2 = list2
    @bs1, @bs2 = BasicStats.new(@list1), BasicStats.new(@list2)
  end

  def covariance_calc
    result = 0.0
    average1 = @bs1.average
    average2 = @bs2.average

    (@list1.count-1).downto(0) do |i|
      result += (@list1[i] - average1)*(@list2[i] - average2)
    end

    result / @list1.count
  end

  def covariance
    @covariance ||= covariance_calc
  end

  def corr
    return 2 if @list1.length != @list2.length
    @corr ||= corr_calc
  end

  def corr_calc
    covariance / (@bs1.stddev*@bs2.stddev)
  end

end

