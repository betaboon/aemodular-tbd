require "json"
require "tempfile"

module Fastlane
  module Actions
    module SharedValues
      FL_CHANGELOG ||= :FL_CHANGELOG
      VERSION_NUMBER ||= :VERSION_NUMBER
    end

    class CreateSemanticChangelogAction < Action
      def self.run(params)
        version = lane_context[SharedValues::VERSION_NUMBER]
        UI.message "Creating semantic changelog for version #{version}"

        Tempfile.create(["context", ".json"]) do |f|
          f.write({"version": version}.to_json)
          f.flush
          command = [
            "npx", "--yes",
            "conventional-changelog-cli",
            "--preset", "conventionalcommits",
            "--context", f.path,
          ]
          output = Fastlane::Actions.sh(command, log: false)
          Actions.lane_context[SharedValues::FL_CHANGELOG] = output
        end
      end

      def self.is_supported?(platform)
        true
      end
    end
  end
end
