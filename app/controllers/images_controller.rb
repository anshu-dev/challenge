class ImagesController < ApplicationController
	skip_before_action :verify_authenticity_token

	def index
		@images = Image.all
		render json: @images
	end

	def create
		@image = Image.create(image_params)
		if @image.persisted?
			render json: {success: true, msg: 'Image uploaded successfully', data: @image}
			return
		end
		render json: {success: false, msg: 'Image not uploaded', data: @image}
		
	end

	def destroy
		id = image_params()[:id]
		@image = Image.find(id)

		if @image.present?
		  @image.destroy
		  render json: {success: true, msg: 'Image delete successfully', data: @image}
		  return
		end
		render json: {success: false, msg: 'Not able to delete image', data: @image}
	end

	private

	def image_params
		params.permit(:id, :title, :description, :mime_type, :size, :featured_image)
	end

end
