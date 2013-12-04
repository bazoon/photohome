module Rolify
  module Adapter   
    class RoleAdapter < RoleAdapterBase
      def find_or_create_by(role_name, resource_type = nil, resource_id = nil)
        role_class.find_or_create_by(name: role_name, resource_type: resource_type, resource_id: resource_id)
      end
    end
  end
end