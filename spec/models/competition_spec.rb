require 'spec_helper'

describe Competition do
  
  describe 'stats' do
    let!(:competition) { create(:competition) }
    let!(:competition_photo1) { create(:competition_photo, competition: competition) }
    let(:competition_photo2) { create(:competition_photo, competition: competition) } 

    let(:jury1) { create(:admin_jury, competition: competition) }
    let(:jury2) { create(:admin_jury, competition: competition) }


    it 'calculates statistics for competition' do
      jury1.rate(competition_photo1, 5)
      jury1.rate(competition_photo2, 8)
      jury2.rate(competition_photo1, 4)
      jury2.rate(competition_photo2, 10)
      stats = competition.stats
      expect(stats[:photo_count]).to eq(2)
      expect(stats[:jury_count]).to eq(2)
      expect(stats[:should_rate_count]).to eq(4)
      expect(stats[:rated_count]).to eq(4)
    end


   it 'calculates statistics for competition with respect to banned photos' do
      jury1.rate(competition_photo1, 5)
      jury1.rate(competition_photo2, 8)
      jury2.rate(competition_photo1, 4)
      jury2.rate(competition_photo2, 10)

      competition_photo1.ban

      stats = competition.stats
      expect(stats[:photo_count]).to eq(1)
      expect(stats[:jury_count]).to eq(2)
      expect(stats[:should_rate_count]).to eq(2)
      expect(stats[:rated_count]).to eq(2)
    end


    it 'discards jury ratings equal 0' do
      jury1.rate(competition_photo1, 0)
      jury1.rate(competition_photo2, 8)
      jury2.rate(competition_photo1, 4)
      jury2.rate(competition_photo2, 10)

      # require "pry"
      # binding.pry

      stats = competition.stats
      expect(stats[:photo_count]).to eq(2)
      expect(stats[:jury_count]).to eq(2)
      expect(stats[:should_rate_count]).to eq(4)
      expect(stats[:rated_count]).to eq(3)
    end






  end
  




end
