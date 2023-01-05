require "fileutils"

module Fastlane
  module Actions
    module SharedValues
      FL_CHANGELOG ||= :FL_CHANGELOG
    end

    class SetPlaystoreChangelogAction < Action
      def self.run(params)
        changelog = lane_context[SharedValues::FL_CHANGELOG]
        version_code = params[:version_code]
        locale = params[:locale]
        UI.message "Creating playstore changelog for version_code #{version_code}"
        changelog_location = "./fastlane/metadata/android/#{locale}/changelogs/#{version_code}.txt"
        changelog_dirname = File.dirname(changelog_location)

        unless File.directory?(changelog_dirname)
          FileUtils.mkdir_p(changelog_dirname)
        end

        File.open(changelog_location, "w") do |f|
          f.write(changelog)
          f.flush
        end
      end

      def self.available_options
        [
          FastlaneCore::ConfigItem.new(key: :version_code,
                                      env_name: "SET_PLAYSTORE_CHANGELOG_VERSION_CODE",
                                      optional: false,
                                          type: Integer),
          FastlaneCore::ConfigItem.new(key: :locale,
                                      env_name: "SET_PLAYSTORE_CHANGELOG_LOCALE",
                                      optional: true,
                                          type: String,
                                 default_value:"en-US"),
        ]
      end

      def self.is_supported?(platform)
        [:android].include?(platform)
      end
    end
  end
end
