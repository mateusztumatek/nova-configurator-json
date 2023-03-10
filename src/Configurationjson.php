<?php

namespace Yax\Configurationjson;

use Illuminate\Support\Facades\Storage;
use Laravel\Nova\Fields\Field;
use Laravel\Nova\Fields\SupportsDependentFields;
use Laravel\Nova\Http\Requests\NovaRequest;

class Configurationjson extends Field
{
    use SupportsDependentFields;
    /**
     * The field's component.
     *
     * @var string
     */
    public $component = 'configurationjson';

    public $fieldName;

    public function imageFromField($fieldName){
        $this->fieldName = $fieldName;
        return $this;
    }

    public function resolve($resource, $attribute = null)
    {
        $fieldName = $this->fieldName;
        $this->withMeta([
            'image_field' => [
                'field' => $this->fieldName,
                'value' => ($resource && $resource->$fieldName)? Storage::url($resource->$fieldName) : null
            ]
        ]);
        return parent::resolve($resource, $attribute); // TODO: Change the autogenerated stub
    }


    public function fill(NovaRequest $request, $model)
    {
        $model->configuration = (is_string($request->configuration))? json_decode($request->configuration) : null;
    }

    public function imageFromSource($source){
        $this->withMeta([
            'image_source' => $source
        ]);
        return $this;
    }
}
