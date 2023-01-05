module Fastlane
  module Actions
    module SharedValues
      VERSION_NUMBER ||= :VERSION_NUMBER
    end

    class CreateSemanticVersionAction < Action
      def self.run(params)
        UI.message "Creating semantic version"
        command = [
          "npx", "--yes",
          "semantic-release",
          "--dry-run",
          "--plugins", "@semantic-release/commit-analyzer",
          "--branches", "main",
          "--tag-format", "'${version}'",
        ]
        output = Fastlane::Actions.sh(command, log: false)
        matches = output.match(/next release version is (.*)/)
        # FIXME this version contains all of the string ... not just the number. fuck
        version = matches ? matches[1] : nil
        if version.nil? then
          UI.success("No next version!")
        else
          Actions.lane_context[SharedValues::VERSION_NUMBER] = version
          UI.success("Next version is #{version}")
        end
      end

      def self.is_supported?(platform)
        true
      end
    end
  end
end
