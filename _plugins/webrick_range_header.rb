# frozen_string_literal: true

# WEBrick Range Header Plugin for Jekyll
#
# This plugin adds the Accept-Ranges header to audio/video files served by WEBrick.
# Chrome requires this header to properly handle media streaming and seeking.
#
# Without this header, Chrome cannot determine if the server supports range requests,
# causing audio files to fail playback or only play a few seconds.

Jekyll::Hooks.register :site, :post_read do |site|
  next unless Jekyll.env == 'development'

  require 'webrick'

  # Store original method
  unless WEBrick::HTTPResponse.method_defined?(:original_setup_header)
    WEBrick::HTTPResponse.class_eval do
      alias_method :original_setup_header, :setup_header

      def setup_header
        original_setup_header

        # Add Accept-Ranges header for audio and video files
        if @header['content-type']
          content_type = @header['content-type']

          media_types = [
            'audio/mpeg',
            'audio/mp3',
            'audio/ogg',
            'audio/mp4',
            'audio/m4a',
            'audio/aac',
            'audio/wav',
            'audio/webm',
            'video/mp4',
            'video/webm',
            'video/ogg'
          ]

          if media_types.any? { |type| content_type.start_with?(type) }
            @header['accept-ranges'] = 'bytes'
          end
        end
      end
    end
  end
end
